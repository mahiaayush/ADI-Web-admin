import * as React from "react";
import { counsellorProfile } from "../../../config";

export default function Plans({ setCheckitm, arr, setArr }) {
    // const [arr, setArr] = React.useState([])
    const handelChecked = (e) => {
        if (e.target.checked) {
            setArr([...arr, e.target.id]);
        }
        if (!e.target.checked) {
            setArr(arr.filter((id) => (id !== e.target.id)))
        }
    }
    React.useEffect(() => {
        if (arr.length > 0) {
            setCheckitm(false)
        } else {
            setCheckitm(true)
        }
    }, [arr])
    return (
        <>
            <table>
                <tr><td><h4>Please select plans *</h4></td></tr>
            </table>
            <table>
                <tr>
                    {counsellorProfile.map((item) => (
                        <td className="checkboxlist" key={item.label.toString()}>
                            <input key={item.label} id={`${item.label}`} className="checkboxitem" type="checkbox" onChange={handelChecked} /> {item.label}
                        </td>
                    ))}
                </tr>
            </table>
        </>
    )
}