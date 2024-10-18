'use client'

export default function RemoveApi() {
    function handleClick() {
        localStorage.removeItem("apikey");
    }
    return (
        <button onClick={handleClick}>
            Remove API
        </button>
    )
}