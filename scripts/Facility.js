export const renderFacilities = async () => {
    const facilities = await fetch("http://localhost:8088/facilities").then (res => res.json())

    let facilitiesHtml = `<select name="facilities"> <option value="">Choose a Facility...</option>`

    facilitiesHtml += facilities.map((facility) => {
        return `<option value="${facility.id}" ${facility.activeStatus ? '' : 'disabled'}>
            ${facility.name} ${facility.activeStatus ? '(Active)' : '(Inactive)'}</option>`
        }).join("") 

    facilitiesHtml += `</select>`
    return facilitiesHtml
}