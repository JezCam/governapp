"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assessmentReportsRows } from "@/dummy-data/reports";
import type { DataTableFilterProps } from "../../../components/data-table/types";

export default function ReportsAssessmentFilter(props: DataTableFilterProps) {
  const [value, setValue] = useState<string>(props.value || "");

  useEffect(() => {
    setValue(props.value || "");
  }, [props.value]);

  return (
    <Select onValueChange={props.onChange} value={value}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Select assessment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Assessment</SelectLabel>
          {assessmentReportsRows.map((row) => (
            <SelectItem key={row.id} value={row.name}>
              <span className="font-medium">{row.name}</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
