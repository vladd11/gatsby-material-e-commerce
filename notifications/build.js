const {buildSync} = require('esbuild')

buildSync({
    entryPoints: ['./notifications/getFCMToken-messaging-sw.js'],
    outfile: './static/getFCMToken-messaging-sw.js',
    bundle: true,
    minify: true,
    define: {
        "process.env.GATSBY_FIREBASE": `'${process.env.GATSBY_FIREBASE}'`
    }
})
