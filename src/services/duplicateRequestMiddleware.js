const pendingRequests = new Map();

const generateRequestKey = (action) => {
  const { type, payload } = action;
  // Génère une clé unique pour chaque requête
  return `${type}|${JSON.stringify(payload)}`;
};

const duplicateRequestMiddleware = store => next => action => {
    if (action.type.endsWith('_REQUEST')) {
      const requestKey = generateRequestKey(action);
  
      if (pendingRequests.has(requestKey)) {
        console.warn('[DUPLICATE REQUEST MIDDLEWARE] Duplicate request detected and blocked:', action);
        return;
      }
  
      pendingRequests.set(requestKey, action);
  
      const result = next(action);
  
      if (result && typeof result.finally === 'function') {
        result.finally(() => {
          pendingRequests.delete(requestKey);
        });
      } else {
        pendingRequests.delete(requestKey);
      }
  
      return result;
    }
  
    return next(action);
  };

export default duplicateRequestMiddleware;