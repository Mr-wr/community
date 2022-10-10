import _web3 from 'web3'
// import common from './common.js'
// 钱包工具
class bsc {
  static walletAddress = false // 当前用户地址

  static web3

  // 检测当前网络环境
  network() {
    return ethereum.networkVersion
  }

  // 初始化wbe3
  init() {
    if (this.web3) {
      // console.log('已经有web3实例对象了')
      return
    }
    if (typeof _web3 !== 'undefined') {
      if (!web3) {
        uni.showToast({
          title: '连接钱包失败',
          icon: 'error',
          duration: 2000,
        })
      }
      this.web3 = new _web3(web3.currentProvider)
    } else {
      this.web3 = new _web3(new Web3.providers.HttpProvider('http://localhost:8080/'))
    }
  }

  // 创建合约对象
  // obj： {
  // 	abi: [],
  // 	contract: ''
  // }
  async Contract(obj) {
    if (this[obj.name]) {
      console.log('已经有合约对象了', obj.name)
      return
    }
    if (!this.web3) {
      await this.init()
      console.log('还没有创建web3实例对象，已为你创建')
    }
    if (typeof obj.abi === 'string') {
      var abi = JSON.parse(obj.abi)
    } else {
      var { abi } = obj
    }
    this[obj.name] = new this.web3.eth.Contract(abi, obj.contract)
    console.log(this[obj.name])
  }

  // 主币交易 bnb
  request(obj) {
    return new Promise(async (resolve, reject) => {
      if (obj.fromAddress) {
        var { fromAddress } = obj
      } else {
        var fromAddress = await this.address()
      }
      const quantity = obj.quantity * 1000000000000000000
      ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: fromAddress, // 付款方
              to: obj.toAddress, // 收款方
              value: `0x${quantity.toString(16)}`, // 价格 16进制
              // gasPrice: '0x'+'0',	// 手续费 可以不设置但是不能过低
              // gasLimit: '0x'+'5208',	// 暂时不知道是什么东西
              // gas: '0x'+'33450'	// 手续费 同上
            },
          ],
        })
        .then(transactionHash => {
          // 成功执行
          resolve(transactionHash)
        })
        .catch(error => {
          // 失败执行
          reject()
        })
    })
  }

  // 连接钱包 initContract
  connect_purse() {
    return new Promise(async (resolve, reject) => {
      if (typeof window.ethereum === 'undefined') {
        // common.msg('当前环境不可用')
        this.init()
        reject()
      }
      const accounts = await ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .catch(err => {
          // common.msg('登录被拒绝')
          reject()
        })
      if (accounts && accounts[0]) {
        // common.msg('登录成功');
        // console.log(accounts[0]);
        this.walletAddress = accounts[0]
        resolve(this.walletAddress)
      }
      // console.log("登录被拒绝", accounts);
    })
  }

  // 发起指定合约转账
  build_transfer(obj) {
    // 调用的合约对象 obj.name
    // 钱包地址 obj.fromAccount
    // 收款地址 obj.toAccount
    // 价格 obj.quantity
    // 合约地址 obj.contract
    // 合约abi obj.abi
    return new Promise(async (resolve, reject) => {
      // 指定的合约对象是否存在,不存在则去创建
      console.log('合约对象', this[obj.name])
      let walletAddress
      if (!this[obj.name]) {
        await this.Contract(obj)
      }
      // 获取代币小数位
      const decimal = await this.specified_decimals(obj)
      // 计算价格
      var { quantity } = obj
      if (decimal && decimal > 6) {
        quantity *= 1000000
        for (var i = 0; i < decimal - 6; i++) {
          quantity += '0'
        }
      } else {
        var sb = 1
        for (var i = 0; i < (decimal || 0); i++) {
          sb += '0'
        }
        quantity *= sb
      }
      // 没有指定的钱包地址则查询当前连接的钱包
      if (obj.fromAccount) {
        walletAddress = obj.fromAccount
      } else {
        walletAddress = await this.address()
      }
      console.log(obj.fromAccount, walletAddress)
      // 计算价格
      var { quantity } = obj
      if (decimal && decimal > 6) {
        quantity *= 1000000
        for (var i = 0; i < decimal - 6; i++) {
          quantity += '0'
        }
      } else {
        var sb = 1
        for (var i = 0; i < (decimal || 0); i++) {
          sb += '0'
        }
        quantity *= sb
      }
      console.log(obj.toAccount)
      this[obj.name].methods.transfer(obj.toAccount, quantity.toString()).send(
        {
          from: walletAddress,
        },
        function (error, transactionHash) {
          if (!error) {
            // 成功执行，返回交易号
            resolve(transactionHash)
          } else {
            // 失败执行
            reject(error)
          }
        }
      )
    })
  }

  // 代币授权
  // 根据地址获取代币金额
  // getTest() {
  //  Contract.methods.approve(this.walletAddress, amount).send({
  //    from: ownerAddr
  //  })
  // }
  async authorize(obj) {
    // 调用的合约对象 obj.name
    // 钱包地址 obj.fromAccount
    // 收款地址 obj.toAccount
    // 价格 obj.quantity
    // 合约地址 obj.contract
    // 合约abi obj.abi
    return new Promise(async (resolve, reject) => {
      // 指定的合约对象是否存在,不存在则去创建
      let walletAddress
      if (!this[obj.name]) {
        await this.Contract(obj)
      }
      // 没有指定的钱包地址则查询当前连接的钱包
      if (obj.fromAccount) {
        walletAddress = obj.fromAccount
      } else {
        walletAddress = await this.address()
      }

      //  console.log('1', this[obj.name], '2', walletAddress)
      // 小数位
      const decimal = await this.specified_decimals(obj)
      // 计算价格
      let { quantity } = obj
      if (decimal && decimal > 6) {
        quantity *= 1000000
        for (var i = 0; i < decimal - 6; i++) {
          quantity += '0'
        }
      } else {
        let sb = 1
        for (var i = 0; i < (decimal || 0); i++) {
          sb += '0'
        }
        quantity *= sb
      }
      console.log('需要的价格', quantity)
      this[obj.name].methods.approve(obj.toAccount, quantity.toString()).send(
        {
          from: walletAddress,
        },
        function (error, transactionHash) {
          if (!error) {
            // 成功执行，返回交易号
            resolve(transactionHash)
          } else {
            // 失败执行
            reject(error)
          }
        }
      )
    })
  }

  // 查询授权金额 allowance
  async queryingAuthorizationAmount(obj, carry) {
    // 调用的合约对象 obj.name
    // 钱包地址 obj.address
    // 收款地址 obj.collection_address
    // 合约地址 obj.contract
    // 合约abi obj.abi
    let walletAddress
    // 指定的合约对象是否存在,不存在则去创建
    if (!this[obj.name]) {
      await this.Contract(obj)
    }
    if (carry) {
      const decimals = await this.specified_decimals(obj)
      var sb = 1
      for (let i = 0; i < decimals; i++) {
        sb += '0'
      }
    }
    // 没有指定的钱包地址则查询当前连接的钱包
    if (obj.address) {
      walletAddress = obj.address
    } else {
      walletAddress = await this.address()
    }
    const res = await this[obj.name].methods.allowance(walletAddress, obj.collection_address).call((error, result) => {
      if (!error) {
        return result
      }
      console.error(error)
    })
    if (carry) {
      return res / sb
    }
    return res
  }

  // 查询以太币余额
  async balance(address, carry) {
    let num
    let walletAddress
    // 没有指定的钱包地址则查询当前连接的钱包
    if (address) {
      walletAddress = address
    } else {
      walletAddress = await this.address()
    }
    await this.web3.eth.getBalance(walletAddress).then(n => {
      num = n
    })
    if (carry) {
      return num / 1000000000000000000
    }
    return num
  }

  // 查询指定代币余额
  async specified_balance(obj, carry) {
    let num
    let walletAddress
    // 指定的合约对象是否存在,不存在则去创建
    if (!this[obj.name]) {
      await this.Contract(obj)
    }
    if (carry) {
      const decimals = await this.specified_decimals(obj)
      var sb = 1
      for (let i = 0; i < decimals; i++) {
        sb += '0'
      }
    }
    // 没有指定的钱包地址则查询当前连接的钱包
    if (obj.address) {
      walletAddress = obj.address
    } else {
      walletAddress = await this.address()
    }
    await this[obj.name].methods.balanceOf(walletAddress).call((error, result) => {
      if (!error) {
        num = result
      } else {
        console.log(error)
      }
    })
    if (carry) {
      return num / sb
    }
    return num
  }

  // 查询代币小数位
  async specified_decimals(obj) {
    // 调用的合约对象 obj.name
    // 钱包地址 obj.fromAccount
    // 合约地址 obj.contract
    // 合约abi obj.abi
    // console.log(obj)
    let num
    // 指定的合约对象是否存在,不存在则去创建
    if (!this[obj.name]) {
      await this.Contract(obj)
    }
    // 没有指定的钱包地址则查询当前连接的钱包

    await this[obj.name].methods.decimals().call((error, result) => {
      if (!error) {
        num = result
      } else {
        console.log(error)
      }
    })
    return num
  }

  // 查询指定代币 tokenId
  async specified_token(obj) {
    // 调用的合约对象 obj.name
    // 钱包地址 obj.fromAccount
    // 合约地址 obj.contract
    // 合约abi obj.abi

    let num
    let walletAddress
    // 指定的合约对象是否存在,不存在则去创建
    if (!this[obj.name]) {
      await this.Contract(obj)
    }
    // 没有指定的钱包地址则查询当前连接的钱包
    if (obj.address) {
      walletAddress = obj.address
    } else {
      walletAddress = await this.address()
    }
    await this[obj.name].methods.tokenOfOwnerByIndex(walletAddress, obj.index).call((error, result) => {
      if (!error) {
        num = result
      } else {
        console.log(error)
      }
    })
    return num
  }

  // nft转移
  // 获取代币名
  async get_name() {
    let name
    if (!this[obj.name]) {
      await this.Contract(obj)
    }
    this[obj.name].methods.name().call((error, result) => {
      if (!error) {
        name = result
      } else {
        console.log(error)
      }
    })
    return name
  }

  // nft转让
  async build_safe(obj) {
    // 调用的合约对象 obj.name
    // 钱包地址 obj.fromAccount
    // 收款地址 obj.toAccount
    // tokenId obj.tokenId
    // 合约地址 obj.contract
    // 合约abi obj.abi

    // 指定的合约对象是否存在,不存在则去创建
    let walletAddress
    if (!this[obj.name]) {
      await this.Contract(obj)
    }
    // 没有指定的钱包地址则查询当前连接的钱包
    if (obj.fromAccount) {
      walletAddress = obj.fromAccount
    } else {
      walletAddress = await this.address()
    }
    this[obj.name].methods.safeTransferFrom(walletAddress, obj.toAccount, obj.tokenId).send(
      {
        from: walletAddress,
      },
      function (error, transactionHash) {
        if (!error) {
          // 成功执行，返回交易号
          obj.success && obj.success(transactionHash)
        } else {
          // 失败执行
          obj.fail && obj.fail(error)
        }
        // 无论如何都执行
        obj.whether && obj.whether()
      }
    )
  }

  // 获取当前连接钱包地址，没有的话尝试登录获取
  async address() {
    if (this.walletAddress) {
      return this.walletAddress
    }
    await this.connect_purse()
    return this.walletAddress
  }

  // 请求切换到指定网络
  network(obj) {
    ethereum.request({
      method: 'wallet_addEthereumChain', // Metamask的api名称
      params: [
        {
          chainId: `0x${obj.chainId.toString(16)}`, // 网络id，16进制的字符串
          chainName: obj.chainName, // 添加到钱包后显示的网络名称
          rpcUrls: [
            obj.host, // rpc地址
          ],
          iconUrls: [
            'https://testnet.hecoinfo.com/favicon.png', // 网络的图标，暂时没看到在哪里会显示
          ],
          blockExplorerUrls: [
            obj.blockExplorerUrl, // 网络对应的区块浏览器
          ],
          nativeCurrency: {
            // 网络主币的信息
            name: obj.symbol,
            symbol: obj.symbol,
            decimals: obj.decimals,
          },
        },
      ],
    })
  }
  // 放在App.vue
  // ethereum.on('networkChanged', (networkIDstring) => {
  // 	//一旦切换网络这里就会执行
  // })
  // ethereum.on("accountsChanged", (accounts) => {
  // 	//一旦切换账号这里就会执行
  // });
}
export default new bsc()
