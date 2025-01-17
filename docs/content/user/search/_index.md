---
title: "Repository Searching"
summary: Searching the Packrat Repository
weight: 210
---

Use the "Search Repository" box at the top of Packrat to perform a keyword search of the repository contents. Click "Search" or hit enter after supplying search text.

When searching, the display of repository contents is updated with objects that match the specified search text.  If the search is performed from within the repository browser page, any selected repository filters are applied to the search results.  If the search is performed from a different Packrat page, all repository filters are removed.

Search tips:
* Packrat's keyword search uses the [Extended DisMax Query Parser](https://solr.apache.org/guide/8_11/the-extended-dismax-query-parser.html)
* Prefix text with "+" to require that exact text to be matched
* Surround multiple words with double quotes to search for that phrase
* Use * and ? for wildcard searches
* Packrat will search for objects with matching identifiers, such as ARK IDs and EDAN MDM IDs
* Capitalization is ignored

As always, you can copy and share the Packrat URL representing your search results to bring another user (or yourself) to the selected view of the repository.