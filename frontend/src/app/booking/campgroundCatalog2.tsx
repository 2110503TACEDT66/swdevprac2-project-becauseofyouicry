"use client";
import { MenuItem, Select, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { CampgroundJson } from "../../../interface";
import { CampgroundItem } from "../../../interface";
export default function CampgroundCatalog2({
  campgroundJson,
  onCampgroundChange,
}: {
  campgroundJson: CampgroundJson;
  onCampgroundChange: Function;
}) {
  const [selectedCampgroundid, setSelectedCampgroundid] = useState<
    string | null
  >(null);
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Select Campground
        </InputLabel>
        <Select
          value={selectedCampgroundid}
          onChange={(e) => {
            setSelectedCampgroundid(e.target.value),
              onCampgroundChange(e.target.value);
          }}
        >
          {campgroundJson.data.map((campground: CampgroundItem) => (
            <MenuItem value={campground._id}>{campground.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
