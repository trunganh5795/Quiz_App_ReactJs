import { Grid } from '@mui/material';
import React from 'react'
type Props = {
    difficulty: string;
    onChoose:boolean;
    setDifficilty: (a: string) => void
}
const Difficulty: React.FC<Props> = (props) => {
    return (
        <Grid item xs={3}>
            <div className={props.onChoose ? "difficulty difficulty_active": "difficulty"}
                onClick={() => {
                    props.setDifficilty(props.difficulty)
                }}
            >
                <p>{props.difficulty}</p>
            </div>
        </Grid>
    )
}
export default Difficulty;