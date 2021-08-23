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

export function onErrorNotification(text) {
    error({
        title: "",
        delay: 5000,
        text: text,
        stack: notificationSettings
    })
}
