
export const renderGovernors = async () => {
    const governors = await fetch("http://localhost:8088/governors").then (res => res.json())

    let governorsHtml = `<select name="governors"> <option value="">Choose a Governor...</option>`

    governorsHtml += governors.map((governor) => {
        return `<option value="${governor.id}">${governor.name}</option>`
    }).join("")

    governorsHtml += `</select>`
    return governorsHtml
}