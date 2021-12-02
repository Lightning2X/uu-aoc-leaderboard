# The UU AOC Leaderboard
You can find the Backend [here](https://github.com/Rutgerdj/advent-of-code-leaderboard).

Front end that visualizes, the results out of RutgerDJs backend. Works per year. Scores etc. are calculated by the front end and not the back end. (See the calculation of scores [here](src/components/leaderboard/data/calculatescores.ts))

## How to run?
1. Clone the github repo
2. Open your command line and run `yarn install` in the project directory
4. After this run `yarn start`
5. Navigate to localhost:5000, and you should be greeted with the front end


## Building
1. Navigate to the project directory
2. Run `yarn install`
3. Run `yarn build`
4. Use a static fileserver (such as yarn serve or [caddy](https://caddyserver.com/v2)) to serve the files locally from the `build/` folder

## Preview:
### Leaderboard:
![firefox_Fho3sENSaF](https://user-images.githubusercontent.com/32514161/144505734-f74aea0a-6836-497d-8dd2-6a36b88cc48a.png)
### User page:
![firefox_3Vm23txi5O](https://user-images.githubusercontent.com/32514161/144505743-10b2b131-3f7a-43dd-a5e0-de2347e25a04.png)

