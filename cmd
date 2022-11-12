#!/bin/bash

ids=()

for _ in $(seq 1 6); do
    selected=$(column -t -s, < src/constants/list.csv | fzf --preview-window hidden)
    id=$(echo "$selected" | awk '{ print $1 }')
    form=$(echo "$selected" | awk '{ print $4 }')
    # id - form format
    ids+=("$id-$form")
done

deno run --allow-net --allow-write --allow-read main.ts "${ids[@]}"
