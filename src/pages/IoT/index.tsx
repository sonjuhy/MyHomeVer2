import { Button } from "@mui/material";

/**
 * stablity
 * 1. loop sequence
 *  1-1. need to divide button event, server connection [when disconnect server, stop to listen button event]
 *  1-1-1. to use interctive : button - set interective, button event - pub msg with mqtt
 * @returns 
 */
export default function Home() {
    return(
        <div>
            <Button>hello? this is iot</Button>
        </div>
    )
}