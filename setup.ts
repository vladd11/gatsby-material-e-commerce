import inquirer from "inquirer"
import emailRegex from "../src/utils/emailRegex";
import fetch, {Headers, Response} from "node-fetch";

const CF_ENDPOINT = "https://api.cloudflare.com/client/v4"

async function getResponseOrThrowErrors(response: Response): Promise<{ [key: string]: any }> {
    const result = await response.json()
    if (!response.ok) {
        throw new Error(`Cloudflare API returned ${response.status} HTTP code\n${response.statusText}\n${JSON.stringify(result, null, 4)}`)
    }

    if (result.errors.length !== 0) {
        throw new Error(`Got errors: ${result.errors}`)
    }

    if (result.messages.length !== 0) {
        console.log(result.messages)
    }

    return result.result
}

inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: "Please enter your site name",
        validate: input => /^[a-z\d][a-z\d\-]*[a-z\d]/.test(input)
    },
    {
        type: "input",
        name: "endpoint",
        message: `Please enter endpoint URL
  You may given from yandex-cloud-serverless-site installer
  If you lost it, go to your Yandex.Cloud dashboard and obtain it again
  If you don't want to use Yandex Cloud, run your own server or use another cloud`
    },
    {
        type: "input",
        name: "database",
        message: "Please enter YDB database path"
    },
    {
        type: "confirm",
        name: "enableNotifications",
        message: "Would you like to enable notifications on your site?"
    },
    {
        type: "input",
        name: "firebaseConfig",
        message: `You need to obtain Firebase Cloud Messaging token and VAPID key to enable in-browser notifications.
  Please go to: https://console.firebase.google.com/ and create new project.
  Then add new web app there and copy firebaseConfig const that was provided to you in "Add Firebase SDK" section.\n`,
        when: answers => answers.enableNotifications
    },
    {
        type: "input",
        name: "vapidKey",
        message: `Please click to "1 app" badge below project name, then open settings of web app.
  Select "Cloud Messaging" tab and obtain key pair of Web Push certificate.\n`,
        when: answers => answers.enableNotifications
    },
    {
        type: "input",
        name: "cfEmail",
        message: `Enter Email of your Cloudflare account there:`,
        validate(input: any): boolean {
            return emailRegex.test(input)
        },
        when: () => !process.env.CF_EMAIL
    },
    {
        type: "input",
        name: "cfToken",
        message: `Please go to https://dash.cloudflare.com/profile/api-tokens in order to obtain API token. 
  Use either global API key or create new token with only Cloudflare Pages permission. 
  Enter it there:`,
        when: () => !process.env.CF_TOKEN
    },
    {
        type: "input",
        name: "cfId",
        message: `Please go to https://dash.cloudflare.com/ and copy long identifier that will be added to the URL.
  Enter it there:`,
        when: () => !process.env.CF_ID
    },
    {
        type: "input",
        name: "githubLogin",
        message: `Create account on Github, if not already.
  Go to gatsby-material-e-commerce repository and fork it: https://github.com/vladd11/gatsby-material-e-commerce
  Please go to https://dash.cloudflare.com/ec9c6644649a219fdf413a4268ecf0ce/pages/new/provider/github and connect your Github repository
  Enter your login there:`,
    },
    {
        type: "input",
        name: "mapToken",
        message: `Please go to https://www.mapbox.com/ and create account there (if not already).
  Then obtain your public token. Enter it there:`
    }
]).then(async answers => {
    const email = answers.cfEmail ?? process.env.CF_EMAIL
    const id = answers.cfId ?? process.env.CF_ID
    const token = answers.cfToken ?? process.env.CF_TOKEN
    const ycToken = answers.ycToken ?? process.env.YC_OAUTH_TOKEN

    const headers = new Headers();
    headers.set("Content-Type", "application/json")
    headers.set("X-Auth-Email", email)
    headers.set("X-Auth-Key", token)

    const env = {
        OAUTH_TOKEN: {
            value: ycToken
        },
        DATABASE: {
            value: answers.database
        },
        GATSBY_FUNCTION_URL: {
            value: answers.endpoint
        }
    }

    const page = await getResponseOrThrowErrors(await fetch(`${CF_ENDPOINT}/accounts/${id}/pages/projects`, {
        headers: headers,
        method: "POST",
        body: JSON.stringify({
            name: answers.name,
            build_config: {
                "build_command": "npm run build",
                "destination_dir": "public",
                "root_dir": "/",
            },
            source: {
                "type": "github",
                "config": {
                    "owner": answers.githubLogin,
                    "repo_name": "gatsby-material-e-commerce",
                    "production_branch": "master",
                    "pr_comments_enabled": true,
                    "deployments_enabled": true
                }
            },
            deployment_configs: {
                preview: {
                    env_vars: env
                },
                production: {
                    env_vars: env
                }
            }
        })
    }))

    const deployment = await getResponseOrThrowErrors(await fetch(`${CF_ENDPOINT}/accounts/${id}/pages/projects/${page.name}/deployments`, {
        headers: headers,
        method: "POST"
    }))
    console.log(deployment)
}).catch(console.error)