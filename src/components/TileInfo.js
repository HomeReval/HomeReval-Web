import React, { Fragment } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@material-ui/core'

export default function TileInfo( props ){

  let startDate = new Date( props.state.startDate )
  let endDate = new Date( props.state.endDate )

  return(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', fontSize: '15px' }}>
      <div>
        <div>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#2196f3' }}>
              { props.state.exercise.name }
            </div>
            <div style={{ fontSize: '14px', fontStyle: 'italic', display: 'flex', justifyContent: 'flex-end' }}>
              { startDate.getDate() + "-" + startDate.getMonth() + "-" + startDate.getFullYear() + " " }/
              { " " + endDate.getDate() + "-" + endDate.getMonth() + "-" + endDate.getFullYear()  }
          </div>
          </div>

          <div> { props.state.exercise.description } </div>
          <div> { props.state.amount }x per sessie </div>
          <div> { props.exerciseSessionsDone } / { props.exerciseSessions } Sessies gedaan</div>

        </div>

        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sessie</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Datum</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { props.state.exerciseSessions.map( function( item, i ) {

                let exerciseSessionDate = new Date( item.date )

                return(
                  <Fragment key={ item.id }>
                    { item.exerciseResult != null ? (
                      <TableRow>
                        <TableCell>{ i + 1 }</TableCell>
                        <TableCell>{ item.exerciseResult.score }</TableCell>
                        <TableCell>{ exerciseSessionDate.getDate() }-{ exerciseSessionDate.getMonth() }-{ exerciseSessionDate.getFullYear() }</TableCell>
                        <TableCell><Button style={{ color: '#2196f3' }}>Bekijk</Button></TableCell>
                      </TableRow>
                    ) : (
                      null
                    )}
                  </Fragment>
                )
              }, this ) }
            </TableBody>
          </Table>
        </div>

      </div>
    </div>
  )
}
