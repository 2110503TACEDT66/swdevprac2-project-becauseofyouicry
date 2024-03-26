"use client"
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { CampgroundJson } from "../../../interface";
import { CampgroundItem } from "../../../interface";
export default function CampgroundCatalog2({campgroundJson , onCampgroundChange} : {campgroundJson:CampgroundJson , onCampgroundChange : Function}){
    const [selectedCampgroundid, setSelectedCampgroundid] = useState<string|null>(null);
    return(
        <Select value = {selectedCampgroundid} onChange={(e) => {setSelectedCampgroundid(e.target.value),(onCampgroundChange(e.target.value))}} >
            {
                campgroundJson.data.map((campground : CampgroundItem ) => (
                    <MenuItem  value={campground._id}>{campground.name}</MenuItem>
                ))    
            }
        </Select>
    )
}