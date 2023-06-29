import React, { useRef, useState } from 'react'

import './SearchText.css'

export const ItemImage = ({ data }) => {

    const [value, setValue] = useState(data)

    React.useEffect(async () => {

    }, [])

    return (
        <div>
            <a className="custom-combobox-option" href="./Conexiones-De-Cobre-FOSET-COPPERFLOW-132.html#image-2">
                <div>
                    <img src="https://www.truper.com/admin/images/ch/49714.jpg" height="32" />
                </div> 
                <div class="descrip">
                    <div>
                        <div>
                            <p> {value.description}</p>
                            <p>
                            <span class="highlight"></span>49714<span className="blank">|</span><span className="highlight"></span>CC-561
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
   );

}

export default ItemImage;