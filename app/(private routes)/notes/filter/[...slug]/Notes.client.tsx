"use client";

import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { fetchNotes } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Link from "next/link";

import css from "./Notes.module.css";

interface NotesClientProps {
  slug: string[];
}

const NotesClient = ({ slug }: NotesClientProps) => {
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const category = slug?.[0] === "all" ? "" : slug?.[0] ?? "";

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPage(1);
      setName(event.target.value);
    },
    250
  );

  const { data } = useQuery({
    queryKey: ["notes", name, currentPage, category],
    queryFn: () => fetchNotes(name, currentPage, category),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox onChange={handleChange} />
          {data?.notes?.length !== 0 && (data?.totalPages ?? 0) > 1 && (
            <Pagination
              totalPages={data?.totalPages ?? 0}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
          <Link className={css.button} href={"/notes/action/create"}>
            Create note +
          </Link>
        </header>
        {data?.notes && data.notes.length > 0 && (
          <NoteList notes={data.notes} />
        )}
      </div>
    </>
  );
};

export default NotesClient;
