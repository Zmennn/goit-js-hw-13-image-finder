import { error, Stack } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";




const notificationSettings = new Stack({
    dir1: 'up',
    dir2: 'left',
    firstpos1: 30,
    firstpos2: 50,
    maxOpen: 1,
    modal: 'false',
    positioned: true,

})
export function onErrorNotification() {
    error({
        title: "Ошибка",
        delay: 4000,
        text: "Что-то пошло не так",
        stack: notificationSettings
    })
}
