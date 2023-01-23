const fs = require('fs')

const images = ['icon.png', 'splash.png']
images.forEach((image) => {
    console.log('Copying images to platforms...', image)
    fs.copyFile(`./public/${image}`, `./resources/${image}`, (err) => {
        if (err) throw err
        console.log(`${image} was copied to resourecs/`)
    })
    fs.copyFile(`./public/${image}`, `./resources/ios/${image}`, (err) => {
        if (err) throw err
        console.log(`${image} was copied to resourecs/ios/`)
    })
    fs.copyFile(`./public/${image}`, `./resources/android/${image}`, (err) => {
        if (err) throw err
        console.log(`${image} was copied to resourecs/android/`)
    })
})