# sTeam-web-interface

Web interface for sTeam - https://github.com/eMBee/sTeam/tree/steam-2.9-source

## Setup Instructions

- Install npm

```
yum install npm
```

- Install the dependencies

```
npm install -g bower
npm install -g http-server
bower install
```

- Start the server

```
http-server
```

## Contributing

#### Coding style
  
Do:

- 4 spaces indent for JavaScript files.
- 2 space for rest of them.
- Keep newline at EOF.
- Use newlines liberally to visually separate logical blocks of code.

Dont:

- Don't mix tabs and spaces.
- Don't use comma-first coding style.
- Do not, at whatever cost, leave trailing whitespaces. Fix your editor if needed.


#### Commits

- Give proper commit messages that describe the change.
- Each commit message should be granular, solving a specific issue.
- Don't mangle a lot of commits together, unless asked for.
- Use GFM in commit messages to link to issues if they are related.
- Use a short summary on the first line.
- Use Markdown in commit messages to make them more readable.
- Wrap commit message lines at 80 chars.


#### Pull requests

- Ensure that you have worked on the latest code to avoid re-introducing removed diffs.
- Give a proper title to your pull requests.
- Giving a description will make the aliens smile.
- Giving a description is no excuse to commit messages that make aliens sad.
