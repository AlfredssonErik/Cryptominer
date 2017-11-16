# Crypto miner
A playground setup for a crypto miner, complete with statistics and controls. 

### Settings

Crypto miner needs an account for the miner to work. 
You can switch out the standard account by replace the hash with your own by creating an account at [Coinhive](https://coinhive.com/account/signup).

```
var miner = new CoinHive.Anonymous('ZZKQ3QJx8sA2BEwcYoKSTqKaByAVrd3h', {
  threads: 1,
});
```
