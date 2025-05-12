from ariadne import load_schema_from_path, format_error, make_executable_schema
from ariadne.asgi import GraphQL
from fastapi import FastAPI
import resolvers

IS_DEBUG = False
app = FastAPI()

def custom_error_formatter(error, debug):
    if IS_DEBUG:
        return format_error(error)
        
    return {
        "message": error.message,
        "locations": [dict(line=error.locations[0].line, column=error.locations[0].column)],
    }


type_defs = load_schema_from_path("graphql/schema.graphql")
# todo implements subscriptions
# how to handle subscriptions in Ariadne is going through a "stage of transition"
# learn more: https://ariadnegraphql.org/docs/subscriptions.html
# resolvers = [query, mutation, subscription]

resolvers = [resolvers.query, resolvers.mutation]
# combine the graphql schema and resolvers to create an executable schema
schema = make_executable_schema(type_defs, resolvers)

# create a GraphQL app with the schema and custom error formatter using Ariadne
graphQL = GraphQL(schema, error_formatter=custom_error_formatter, debug=IS_DEBUG)

# mounting the GraphQL app to the FastAPI app  and call it with the path "/graphql" e.g http://localhost:8000/graphql
app.mount("/graphql", graphQL)
