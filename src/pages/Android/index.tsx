import { Button } from "@mui/material";

/**
 * 1. legacy code update
 *  1-1. update sdk 28 -> 34 [user device min sdk is 33]
 *  1-2. change mqtt broadcast (global -> local) [for security]
 *  1-3. change network lib (asynctask -> retrofit2) [deprecated code]
 * 2. ui
 *  2-1. root interface to fragment interface [user want to see all feature in one page]
 *  2-2. component(text, image, item etc...) size is more bigger than before [for visibility]
 *  2-3. in cloud feature, add thumbnail in image or video file [user want to know file before get detail info]
 * 3. maintenance
 *  3-1. change patterns to mvvm
 *  3-2. get default path, key etc info from db. not hard coding
 *  3-3. static info data change enum type before hard coding 
 * 
 */
export default function Home() {
    return(
        <div>
            <Button>hello? this is android</Button>
        </div>
    )
}