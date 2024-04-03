import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  TextField
} from "@mui/material";
import { fetchTags } from "../actions/tagsActions";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const TagBrowser = () => {
  const dispatch = useDispatch();
  const { tags, loading, error } = useSelector((state) => state.tags);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [perPageInput, setPerPageInput] = useState(10);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleSort = (column) => {
    if (sortedColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
    setPagination({ ...pagination});
  };

  const arrowDirection = (column) => {
    if (sortedColumn === column) {
      return sortOrder === "asc" ? <ArrowUpward /> : <ArrowDownward />;
    }
    return <ArrowDownward />;
  };

  const handlePerPageChange = (event) => {
    const perPage = parseInt(event.target.value, 10);
    setPerPageInput(perPage);
    setPagination({ ...pagination, perPage });
  };

  const sortedTags = tags.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortedColumn] > b[sortedColumn] ? 1 : -1;
    } else {
      return a[sortedColumn] < b[sortedColumn] ? 1 : -1;
    }
  });

  const startIndex = (pagination.page - 1) * pagination.perPage;
  const endIndex = startIndex + pagination.perPage;
  const paginatedTags = sortedTags.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedTags.length / pagination.perPage);

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setPagination({ ...pagination, page: pagination.page - 1 });
    }
  };

  const handleNextPage = () => {
    if (pagination.page < totalPages) {
      setPagination({ ...pagination, page: pagination.page + 1 });
    }
  };

  if (loading) return <CircularProgress />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <TextField
          label="Elements Per Page"
          type="number"
          value={perPageInput}
          onChange={handlePerPageChange}
          InputLabelProps={{
            shrink: true,
            style: { marginLeft: '0.5rem', marginTop: '0.5rem' } 
          }}
        />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Tag
              <IconButton onClick={() => handleSort("name")}>
                {arrowDirection("name")}
              </IconButton>
            </TableCell>
            <TableCell>
              Count
              <IconButton onClick={() => handleSort("count")}>
                {arrowDirection("count")}
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedTags.map((tag) => (
            <TableRow key={tag.name}>
              <TableCell>{tag.name}</TableCell>
              <TableCell>{tag.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handlePrevPage} disabled={pagination.page === 1}>
        Previous Page
      </Button>
      <Button
        onClick={handleNextPage}
        disabled={pagination.page === totalPages}
      >
        Next Page
      </Button>
    </div>
  );
};

export default TagBrowser;
