var parseAutomaton;

parseAutomaton = function(parse_string) {
  var automaton, currentState, getProps, getRank, getState, getSuccessors, isStateString, isSuccessorString, line, propRegEx, rankRegEx, stateRegEx, successorRegEx, _i, _len, _ref;
  automaton = {};
  stateRegEx = /\w+(?= with)/gi;
  rankRegEx = /\d+(?= ->)/gi;
  propRegEx = /\w+:\d(?=,|>)/gi;
  successorRegEx = /\w+(?=,|$)/gi;
  getState = function(str) {
    return str.match(stateRegEx)[0];
  };
  getRank = function(str) {
    return parseInt(str.match(rankRegEx)[0]);
  };
  getProps = function(str) {
    var prop, propSplit, props, _i, _len, _ref;
    props = {};
    _ref = str.match(propRegEx);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      prop = _ref[_i];
      propSplit = prop.split(":");
      props[propSplit[0]] = parseInt(propSplit[1]);
    }
    return props;
  };
  getSuccessors = function(str) {
    return str.match(successorRegEx);
  };
  isStateString = function(str) {
    if (str.search(stateRegEx) >= 0) {
      return true;
    } else {
      return false;
    }
  };
  isSuccessorString = function(str) {
    if (str.search(successorRegEx) >= 0) {
      return true;
    } else {
      return false;
    }
  };
  currentState = '';
  _ref = parse_string.trim().split("\n");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    line = _ref[_i];
    if (isStateString(line)) {
      currentState = getState(line);
      automaton[currentState] = {
        "rank": getRank(line),
        "props": getProps(line),
        "successors": []
      };
    } else if (isSuccessorString(line)) {
      automaton[currentState]["successors"] = getSuccessors(line);
    } else {
      console.warn("Automaton Parsing: neither state nor successor string");
    }
  }
  return automaton;
};