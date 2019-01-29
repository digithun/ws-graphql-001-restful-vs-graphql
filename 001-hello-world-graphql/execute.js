const { graphql } = require("graphql")
const { schema } = require("./schema")
const jclrz = require("json-colorz")

const query = `
{
  hello(name: "art")
}`

graphql(schema, query).then((result) => {
  console.log(`result of query ${query}\nis`)
  jclrz(result)
})
