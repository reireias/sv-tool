#!/bin/bash

ids=()

for _ in $(seq 1 6); do
    id=$(column -t -s, < src/constants/list.csv | fzf --preview-window hidden | awk '{ print $1 }')
    # id - form format
    ids+=("$id-0")
done

deno run --allow-net --allow-write --allow-read main.ts "${ids[@]}"
