import { useEffect, useState } from "react";

import { getBookId }     from "@/utils/url";
import { buildPageList } from "@/utils/pages";
import { fetchPages }    from "@/api";
import { PageFlipBook }  from "@/components/PageFlipBook";

export default function Viewer() {
    const bookId = getBookId(location.pathname);
    if (!bookId) {
        return <h2>読み込み失敗</h2>;
    }
    const safeBookId: string = bookId;

    const [pages, setPages] = useState<string[]>([]);

    useEffect(() => {
        async function load() {
            const json = await fetchPages(safeBookId);
            setPages(buildPageList(safeBookId, json));
        }

        load();
    }, [bookId]);

    return <PageFlipBook pages={pages} />;
}