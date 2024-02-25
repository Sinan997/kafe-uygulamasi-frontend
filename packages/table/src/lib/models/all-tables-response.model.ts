import { BasicResponseModel } from "theme-shared";
import { TableModel } from "./table.model";

export interface AllTablesResponse extends BasicResponseModel {
    tables: TableModel[];
}