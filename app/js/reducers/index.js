import {
  ETHEREUM_LOAD_ERROR,
  WEB3_ERROR,
  ETHEREUM_LOADED,
  NETWORK_ID_LOADED,
  LOADING_OWNER,
  OWNER_LOADED,
  OWNER_BALANCE_LOADED,
  LOADING_WALLETS,
  WALLETS_LOADED,
  COUNTING_WALLETS,
  WALLETS_COUNTED,
  LOADING_WALLET,
  WALLET_LOADED,
  NEW_WALLET,
  NEW_WALLET_SELECT_ICON,
  NEW_WALLET_CANCEL,
  CREATING_WALLET,
  WALLET_CREATED,
  WALLET_CREATION_ERROR,
} from "../actions";

const newWalletFormInitialState = {
  open: false,
  icon: null,
  creating: false,
  error: null
}

const initialState = {
  loadingWeb3: true,
  loadingWeb3Error: null,
  loadingOwner: false,
  owner: null,
  ownerBalance: null,
  loadingWallets: false,
  countingWallets: false,
  walletsCount: 0,
  loadedWalletsCount: 0,
  wallets: [],
  newWalletForm: newWalletFormInitialState,
};

export default function(state, action) {
  console.log("state", state)
  console.log("action", action)

  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case ETHEREUM_LOAD_ERROR:
      alert(action.error)
      return Object.assign({}, state, {
        loadingWeb3: false,
        loadingWeb3Error: action.err
      });
    case WEB3_ERROR:
      console.error(action.error)
      alert(action.error)
      break;
    case ETHEREUM_LOADED:
      return Object.assign({}, state, {
        loadingWeb3: false,
      });
    case NETWORK_ID_LOADED:
      return Object.assign({}, state, {
        networkID: action.id,
      });
    case LOADING_OWNER:
      return Object.assign({}, state, {
        loadingOwner: true,
      });
    case OWNER_LOADED:
      return Object.assign({}, state, {
        loadingOwner: false,
        owner: action.owner,
      });
    case OWNER_BALANCE_LOADED:
      return Object.assign({}, state, {
        ownerBalance: action.balance,
      });
    case LOADING_WALLETS:
      return Object.assign({}, state, {
        loadingWallets: true,
        walletsCount: 0,
        loadedWalletsCount: 0,
      });
    case WALLETS_LOADED:
      return Object.assign({}, state, {
        loadingWallets: false,
        wallets: action.wallets,
      });
    case COUNTING_WALLETS:
      return Object.assign({}, state, {
        countingWallets: true,
      });
    case WALLETS_COUNTED:
      return Object.assign({}, state, {
        countingWallets: false,
        walletsCount: action.count,
        wallets: new Array(action.count)
      });
    case WALLET_LOADED:
      const wallet = {
        address: action.address,
        keycard: action.keycard,
        name: action.name,
        value: action.value,
        icon: action.icon
      }

      return Object.assign({}, state, {
        wallets: [
          ...state.wallets.slice(0, action.index),
          wallet,
          ...state.wallets.slice(action.index + 1)
        ],
        loadedWalletsCount: state.loadedWalletsCount + 1
      });
    case NEW_WALLET:
      return Object.assign({}, state, {
        newWalletForm: {
          ...newWalletFormInitialState,
          open: true
        }
      });
    case NEW_WALLET_SELECT_ICON:
      return Object.assign({}, state, {
        newWalletForm: {
          ...state.newWalletForm,
          icon: action.icon
        }
      });
    case NEW_WALLET_CANCEL:
      return Object.assign({}, state, {
        newWalletForm: {
          ...state.newWalletForm,
          open: false
        }
      });
    case CREATING_WALLET:
      const tmpWallet = {
        creating: true,
        address: "",
        keycard: "",
        name: "",
        value: 0,
        icon: action.icon
      }

      return Object.assign({}, state, {
        newWalletForm: {
          ...state.newWalletForm,
          creating: true
        },
        wallets: [
          ...state.wallets.slice(0, action.index),
          tmpWallet,
          ...state.wallets.slice(action.index + 1)
        ]
      });
    case WALLET_CREATED:
      return Object.assign({}, state, {
        newWalletForm: newWalletFormInitialState
      });
    case WALLET_CREATION_ERROR:
      return Object.assign({}, state, {
        newWalletForm: {
          ...newWalletFormInitialState,
          open: true,
          error: action.error
        }
      });
  }

  return state;
}
