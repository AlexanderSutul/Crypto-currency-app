import React from "react"
import { normalize } from "../services/normalization"
import { Container, Grid, Paper, Typography } from "@material-ui/core"

const Chart = ({ history }) => {
  const [max, setMax] = React.useState(Math.max(...history))
  const [min, setMin] = React.useState(Math.min(...history))

  const normalizedHistory = normalize(history?.map((hist) => hist?.eur))

  return (
    <Container style={{ display: "flex" }}>
      <Grid>
        <Paper
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            alignContent: "start",
            justifyContent: "space-between",
          }}
        >
          {normalizedHistory?.map((hist) => (
            <Paper
              style={{
                height: hist * 100 || 10,
              }}
            >
              <Typography>{hist.toFixed(2)}</Typography>
            </Paper>
          ))}
        </Paper>
      </Grid>
    </Container>
  )
}

export default Chart
