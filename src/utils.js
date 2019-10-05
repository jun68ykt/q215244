export const INITIAL_ID = 9000
export const nextId = ((id) => (() => id ++))(INITIAL_ID)

export const WEEK_DAYS = [ "月", "火", "水", "木", "金" ]

export const MAX_PERIOD = 5
export const zenkaku = n => String.fromCharCode(`${n}`.charCodeAt(0) + 0xFEE0)
