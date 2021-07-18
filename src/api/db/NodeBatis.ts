import { promises as pfs } from "fs";
import { parseString } from "xml2js";

interface IMapperProps {
  mapFile: string;
  id: string;
  param?: any;
}

interface IStatementProps {
  _: string;
  $: { id: string };
}

class NodeBatis {
  private xmlPath: string;
  constructor() {
    this.xmlPath = `${__dirname}/map`;
  }
  /**
   * async getMapperXml
   */
  async getMapperXml(fileName: string) {
    // map파일을 읽어온다.
    try {
      const xmlData = await pfs.readFile(
        `${this.xmlPath}/${fileName}.xml`,
        "utf8"
      );
      const data = await this.getXml2Json(xmlData);
      return data;
    } catch (err) {
      throw err;
    }
  }

  /**
   * async getSelectStatement
   */
  async getSelectStatement({ mapFile, id, param }: IMapperProps) {
    const {
      mapper: { select },
    }: any = await this.getMapperXml(mapFile);

    const sqlStatement: IStatementProps[] = select.filter(
      (item: any) => item["$"].id === id
    );
    const sql = this.validationSql(sqlStatement, mapFile, id, "select");

    const preparedSql = this.prepareSqlStatement(sql, param);

    return preparedSql;
  }

  /**
   * async getInsertStatement
   */
  async getInsertStatement({ mapFile, id, param }: IMapperProps) {
    const {
      mapper: { insert },
    }: any = await this.getMapperXml(mapFile);

    const sqlStatement: IStatementProps[] = insert.filter(
      (item: any) => item["$"].id === id
    );
    let sql = this.validationSql(sqlStatement, mapFile, id, "insert");

    const preparedSql = this.prepareSqlStatement(sql, param);

    return preparedSql;
  }

  /**
   * async getUpdateStatement
   */
  async getUpdateStatement({ mapFile, id, param }: IMapperProps) {
    const {
      mapper: { update },
    }: any = await this.getMapperXml(mapFile);

    const sqlStatement: IStatementProps[] = update.filter(
      (item: any) => item["$"].id === id
    );
    let sql = this.validationSql(sqlStatement, mapFile, id, "update");

    const preparedSql = this.prepareSqlStatement(sql, param);

    return preparedSql;
  }

  /**
   * async getDeleteStatement
   */
  async getDeleteStatement({ mapFile, id, param }: IMapperProps) {
    const { mapper }: any = await this.getMapperXml(mapFile);

    const sqlStatement: IStatementProps[] = mapper.delete.filter(
      (item: any) => item["$"].id === id
    );
    let sql = this.validationSql(sqlStatement, mapFile, id, "delete");

    const preparedSql = this.prepareSqlStatement(sql, param);

    return preparedSql;
  }

  /**
   * getXml2Json
   */
  getXml2Json(stringXml: string) {
    return new Promise((resolve, reject) => {
      parseString(stringXml, function (err, result) {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  /**
   * validationSql
   */
  validationSql(
    sqlStatement: IStatementProps[],
    mapFile: string,
    id: string,
    type: string
  ) {
    if (sqlStatement.length === 0) {
      throw `No SqlStatement: ${mapFile}.${type}.${id}`;
    } else if (sqlStatement.length > 1) {
      throw `SqlStatement is duplication:  ${mapFile}.${type}.${id}`;
    }
    console.log(sqlStatement[0]["_"]);
    return sqlStatement[0]["_"];
  }

  /**
   * prepareSqlStatement
   */
  prepareSqlStatement(sql: string, param: any) {
    if (param) {
      Object.keys(param).forEach((key, index) => {
        if (typeof param[key] === "string") {
          sql = sql.replace(new RegExp(`#{${key}}`, "gi"), `'${param[key]}'`);
        } else {
          sql = sql.replace(new RegExp(`#{${key}}`, "gi"), param[key]);
        }
      });
      console.log(sql);
    }
    return sql;
  }
}

export default new NodeBatis();
