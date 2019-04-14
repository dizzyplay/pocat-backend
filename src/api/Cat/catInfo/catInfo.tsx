
export default {
  Query: {
    catInfo: async (_, args, { request, isAuthenticated, connection }) => {
      console.log('test')
      console.log('test')
      return 'dfd'
    }
  }
};