import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Div } from "./style";

export default function Card() {
  return (
    <Div>
      <Stack spacing={1}>
        <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
      </Stack>
    </Div>
  );
}
