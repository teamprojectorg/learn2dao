import { ITableProps, kaReducer, Table } from "ka-table";
import { search } from "ka-table/actionCreators";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
import { ICellTextProps } from "ka-table/props";
import { DispatchFunc } from "ka-table/types";
import React, { useState } from "react";
import Avatar from "./Avatar";
import Text from "./Text";

const NameCell: React.FC<ICellTextProps> = ({ value }) => {
  return (
    <div className="flex flex-row gap-3 items-center">
      <Avatar text={value} size={30} /> <Text.body>{value}</Text.body>
    </div>
  );
};

const dataArray = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    daoKey: index,
    daoName: `column:1 row:${index}`,
    daoHolders: `${index}`,
    daoContractAddress: `0x1A4b46696b2bB4794Eb3D4c26f1c55F9170fa4C5`,
  }));

const columns: ITableProps["columns"] = [
  { key: "daoName", title: "Name", dataType: DataType.String },
  {
    key: "daoHolders",
    colGroup: { style: { maxWidth: 300 } },
    title: "Holders",
    dataType: DataType.String,
  },
  {
    key: "daoContractAddress",
    title: "Contract Address",
    dataType: DataType.String,
  },
];

const searchFn: ITableProps["search"] = ({ searchText, rowData, column }) => {
  if (column.key === "passed") {
    return (
      (searchText === "false" && !rowData.passed) ||
      (searchText === "true" && rowData.passed)
    );
  }
};

const DAOOverviewTable: React.FC = () => {
  const [tableProps, changeTableProps] = useState<ITableProps>({
    rowKeyField: "daoKey",
    columns,
    data: dataArray,
    editingMode: EditingMode.Cell,
    sortingMode: SortingMode.Single,
    columnResizing: true,
    search: searchFn,
  });

  const dispatch: DispatchFunc = (action) => {
    changeTableProps((prevState: ITableProps) => kaReducer(prevState, action));
  };

  return (
    <>
      <input
        type="search"
        defaultValue={tableProps.searchText}
        onChange={(event) => dispatch(search(event.currentTarget.value))}
        className="top-element"
      />
      <Table
        {...tableProps}
        childComponents={{
          noDataRow: {
            content: () => "No Data Found",
          },
          cellText: {
            content: (props) => {
              switch (props.column.key) {
                case "daoName":
                  return <NameCell {...props} />;
                default:
                  return <Text.body>{props.value}</Text.body>;
              }
            },
          },
          cell: {
            elementAttributes: ({ column }) =>
              ({
                "data-column": column.title,
              } as any),
          },
        }}
        dispatch={dispatch}
      />
    </>
  );
};

export default DAOOverviewTable;
