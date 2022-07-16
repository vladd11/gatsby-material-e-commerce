const {buildSync} = require('esbuild')

buildSync({
    entryPoints: ['./notifications/firebase-messaging-sw.js'],
    outfile: './static/firebase-messaging-sw.js',
    bundle: true,
    minify: true,
    define: {
        "process.env.GATSBY_FIREBASE": `'${process.env.GATSBY_FIREBASE}'`
    }
})
