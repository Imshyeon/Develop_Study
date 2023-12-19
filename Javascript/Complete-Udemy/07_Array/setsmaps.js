const ids = new Set(['Hi', 'From', 'Set!']);
ids.add(2)
for (const entry of ids.entries()) {
    console.log(entry[0])
}

if (ids.has("Hi")) {
  ids.delete("Hi");
}
console.log(ids);