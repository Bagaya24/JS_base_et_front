import hello2 from "./hello.js"
export const sum = (items) => {
    return items.reduce((acc, item) => acc + item, 0)
}

export const hello = hello2