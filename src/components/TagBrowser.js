import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { fetchTags } from "../actions/tagsActions";

const TagBrowser = () => {
  const dispatch = useDispatch();
  const { tags, loading, error } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.name}>
              <TableCell>{tag.name}</TableCell>
              <TableCell>{tag.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TagBrowser;
