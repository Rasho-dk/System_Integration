* GraphQl er ikke godt ved at bruge authoriztoin ift. hemlig data 
    - Det er ikke godt at bruge i fileuploads
* GraphQl er godt når man skal hente data fra flere steder som er en graph
    - fx GraphQl er ikke godt at bruge i chat for at hente gamle beskeder så en http request kunne være nok. 
* at brug public søg api og send mange response så bruger vi mindre data fordi vi kan defindere hvad der skal hentes

* // Ved at bruge graphql så kan vi ikke cach http

* Opgaver appolo bruger websocket til subscription
  - ariadne  schema frist
  - hvordan få vi fat i bøg - fx. resolver - hvad er resolver 
  - hvor mange typer er der fx. query, mutation, subsvription
  Pros, Cons
  - + Grqphql - er det godt at mellem frontend - backend hvis vi bruger resovler så er der ikke noget der blokere det mellem
  - - claim roller er ikke godt i graphql
  - + stor virskomehder med manger data muliheder.
  - 

# https://docs.github.com/en/graphql/overview/explorer

```GraphQl
    {
    me: user(login: "rasho-dk") {
        ...UserFragment
    }
    user(login: "rasho") {
        ...UserFragment 
        bio
    }
    }

    fragment UserFragment on User {
    id
    avatarUrl
    }

    * ved at definde varaible 
    query getMyProfile ($myUser: String!) {
    user(login:$myUser){
        avatarUrl
        issues(last: 4){
        nodes {
            body        
        }
        }
    }
    }

    * ved at bruge seach ved 
    {
    search (query:"zealand" , type:REPOSITORY , last: 5) {
        nodes {
        __typename
        ...on Issue {
            author{
            login
            }
        }
        ... on Repository {
            name
            nameWithOwner
        }
        }
    }
    }

```
