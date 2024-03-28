"use client";
import { MenuItem, Select, InputLabel } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { CampgroundJson } from "../../../interface";
import { CampgroundItem } from "../../../interface";
import { createTheme, ThemeProvider } from '@mui/material/styles';
export default function CampgroundCatalog2({
  campgroundJson,
  onCampgroundChange,
}: {
  campgroundJson: CampgroundJson;
  onCampgroundChange: Function;
}) {

  const theme = createTheme({
    palette: {
      text: {
        primary: '#e3f2fd'
      },
      background: {
        paper: '#000000',
        default: '#000000'
      },
      primary: {
        main: '#e3f2fd',
        light: '#e3f2fd',
        dark: '#e3f2fd',
        contrastText: '#e3f2fd'
      },
      secondary: {
        main: '#ef5350'
      },
      info: {
        main: '#e3f2fd',
        light: '#e3f2fd',
        dark: '#e3f2fd',
        contrastText: '#e3f2fd'
      },
    },
  });

  const [selectedCampgroundid, setSelectedCampgroundid] = useState<
    string | null
  >(null);
  return (
    <div>
      <ThemeProvider theme={theme}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }} color="primary">
        <InputLabel id="demo-simple-select-standard-label" color="primary">
          Select Campground
        </InputLabel>
        <Select
          value={selectedCampgroundid}
          onChange={(e) => {
            setSelectedCampgroundid(e.target.value),
              onCampgroundChange(e.target.value);
          }}
          required
          color="primary"
        >
          {campgroundJson.data.map((campground: CampgroundItem) => (
            <MenuItem value={campground._id}>{campground.name}</MenuItem>
          ))}
        </Select>
        
      </FormControl>
      </ThemeProvider>
    </div>
  );
}
