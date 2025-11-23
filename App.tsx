import React, { useState, useEffect } from 'react';
import { Trophy, User, LogOut, Calendar, TrendingUp, Users } from 'lucide-react';

export default function TennisLadderApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('login');
  const [selectedLadder, setSelectedLadder] = useState('mens');
  
  // Mock data for development - will be replaced with real storage
  const [players, setPlayers] = useState([
    { id: 1, name: 'John Smith', rank: 1, gender: 'mens', wins: 5, losses: 1, phone: '555-0101', email: 'john@example.com', lastMatch: new Date().toISOString() },
    { id: 2, name: 'Mike Johnson', rank: 2, gender: 'mens', wins: 4, losses: 2, phone: '555-0102', email: 'mike@example.com', lastMatch: new Date().toISOString() },
    { id: 3, name: 'Tom Wilson', rank: 3, gender: 'mens', wins: 3, losses: 3, phone: '555-0103', email: 'tom@example.com', lastMatch: new Date().toISOString() },
    { id: 4, name: 'Sarah Davis', rank: 1, gender: 'womens', wins: 6, losses: 0, phone: '555-0201', email: 'sarah@example.com', lastMatch: new Date().toISOString() },
    { id: 5, name: 'Emma Brown', rank: 2, gender: 'womens', wins: 4, losses: 2, phone: '555-0202', email: 'emma@example.com', lastMatch: new Date().toISOString() },
  ]);

  const [challenges, setChallenges] = useState([]);
  const [matches, setMatches] = useState([]);

  // Login Component
  const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerData, setRegisterData] = useState({
      name: '', email: '', password: '', phone: '', gender: 'mens'
    });

    const handleLogin = () => {
      const player = players.find(p => p.email === email);
      if (player) {
        setCurrentUser(player);
        setView('ladder');
      } else {
        alert('Player not found. Try: john@example.com');
      }
    };

    const handleRegister = () => {
      alert('Registration submitted! In production, this would be sent to admin for approval.');
      setIsRegistering(false);
    };

    if (isRegistering) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-center mb-6">
              <Trophy className="text-green-600" size={40} />
              <h1 className="text-3xl font-bold ml-3 text-gray-800">Register</h1>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={registerData.gender}
                  onChange={(e) => setRegisterData({...registerData, gender: e.target.value})}
                >
                  <option value="mens">Men's Ladder</option>
                  <option value="womens">Women's Ladder</option>
                </select>
              </div>
              
              <button
                onClick={handleRegister}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Submit Registration
              </button>
              
              <button
                onClick={() => setIsRegistering(false)}
                className="w-full text-gray-600 py-2 hover:text-gray-800"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="text-green-600" size={40} />
            <h1 className="text-3xl font-bold ml-3 text-gray-800">Tennis Ladder</h1>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Login
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsRegistering(true)}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              New player? Register here
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-gray-600">
            <strong>Demo:</strong> Use john@example.com to login
          </div>
        </div>
      </div>
    );
  };

  // Ladder View Component
  const LadderView = () => {
    const ladderPlayers = players
      .filter(p => p.gender === selectedLadder)
      .sort((a, b) => a.rank - b.rank);

    const canChallenge = (opponent) => {
      if (!currentUser) return false;
      if (currentUser.gender !== opponent.gender) return false;
      if (currentUser.id === opponent.id) return false;
      
      const rankDiff = currentUser.rank - opponent.rank;
      return rankDiff >= 2 && rankDiff <= 3;
    };

    const handleChallenge = (opponent) => {
      const activeChallengesCount = challenges.filter(
        c => c.challenger.id === currentUser.id && c.status === 'pending'
      ).length;
      
      if (activeChallengesCount >= 2) {
        alert('You already have 2 active challenges. Complete those before issuing new ones.');
        return;
      }
      
      const newChallenge = {
        id: Date.now(),
        challenger: currentUser,
        opponent: opponent,
        date: new Date().toISOString(),
        deadline: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
      };
      setChallenges([...challenges, newChallenge]);
      alert(`Challenge sent to ${opponent.name}! You have 9 days to schedule and play the match.`);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Current Rankings</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedLadder('mens')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLadder === 'mens'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Men's
            </button>
            <button
              onClick={() => setSelectedLadder('womens')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedLadder === 'womens'
                  ? 'bg-pink-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Women's
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {ladderPlayers.map((player) => (
            <div
              key={player.id}
              className={`bg-white rounded-lg shadow-md p-4 ${
                player.id === currentUser?.id ? 'ring-2 ring-green-500' : ''
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full text-white font-bold text-lg">
                    #{player.rank}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {player.name}
                      {player.id === currentUser?.id && (
                        <span className="ml-2 text-sm text-green-600">(You)</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Record: {player.wins}-{player.losses} â€¢ Win Rate: {
                        player.wins + player.losses > 0
                          ? Math.round((player.wins / (player.wins + player.losses)) * 100)
                          : 0
                      }%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${player.phone}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {player.phone}
                  </a>
                  
                  {canChallenge(player) && (
                    <button
                      onClick={() => handleChallenge(player)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Challenge
                    </button>
                  )}
                  
                  {player.id === currentUser?.id && (
                    <button
                      onClick={() => setView('profile')}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                    >
                      View Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Challenges View Component
  const ChallengesView = () => {
    const myChallenges = challenges.filter(
      c => c.challenger.id === currentUser?.id || c.opponent.id === currentUser?.id
    );

    const handleReportResult = (challenge) => {
      setView('reportMatch');
      window.currentChallenge = challenge;
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">My Challenges</h2>
        
        {myChallenges.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
            <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
            <p>No active challenges</p>
            <p className="text-sm mt-2">Go to the ladder to challenge players 2-3 spots above you!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myChallenges.map((challenge) => {
              const isChallenger = challenge.challenger.id === currentUser?.id;
              const opponent = isChallenger ? challenge.opponent : challenge.challenger;
              const daysLeft = Math.ceil((new Date(challenge.deadline) - new Date()) / (1000 * 60 * 60 * 24));
              
              return (
                <div key={challenge.id} className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center flex-wrap gap-3">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {isChallenger ? 'You challenged' : 'Challenged by'} {opponent.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        #{challenge.challenger.rank} vs #{challenge.opponent.rank}
                      </p>
                      <p className={`text-sm mt-1 ${daysLeft <= 2 ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed!'}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <a
                        href={`tel:${opponent.phone}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Call {opponent.name.split(' ')[0]}
                      </a>
                      {isChallenger && (
                        <button
                          onClick={() => handleReportResult(challenge)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        >
                          Report Result
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Report Match View
  const ReportMatchView = () => {
    const [score, setScore] = useState({ winner: '', loser: '' });
    
    const handleSubmit = () => {
      if (!score.winner || !score.loser) {
        alert('Please enter both scores');
        return;
      }
      
      const challenge = window.currentChallenge;
      
      const winner = challenge.challenger.id === currentUser.id ? challenge.challenger : challenge.opponent;
      const loser = challenge.challenger.id === currentUser.id ? challenge.opponent : challenge.challenger;
      
      if (winner.rank > loser.rank) {
        const updatedPlayers = players.map(p => {
          if (p.id === winner.id) return { ...p, rank: loser.rank, wins: p.wins + 1, lastMatch: new Date().toISOString() };
          if (p.id === loser.id) return { ...p, rank: winner.rank, losses: p.losses + 1, lastMatch: new Date().toISOString() };
          return p;
        });
        setPlayers(updatedPlayers);
        setCurrentUser({...winner, rank: loser.rank, wins: winner.wins + 1});
        alert(`Congratulations! You moved up to rank #${loser.rank}!`);
      } else {
        const updatedPlayers = players.map(p => {
          if (p.id === winner.id) return { ...p, wins: p.wins + 1, lastMatch: new Date().toISOString() };
          if (p.id === loser.id) return { ...p, losses: p.losses + 1, lastMatch: new Date().toISOString() };
          return p;
        });
        setPlayers(updatedPlayers);
        setCurrentUser({...winner, wins: winner.wins + 1});
        alert('Match recorded! Rankings remain the same.');
      }
      
      setChallenges(challenges.filter(c => c.id !== challenge.id));
      
      setMatches([...matches, {
        id: Date.now(),
        winner: winner,
        loser: loser,
        score: `${score.winner}-${score.loser}`,
        date: new Date().toISOString()
      }]);
      
      setView('challenges');
    };

    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Report Match Result</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              You won the match?
            </label>
            <p className="text-sm text-gray-600 mb-4">Only the winner should report results</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Final Score</label>
            <div className="flex items-center gap-3 justify-center">
              <div>
                <label className="block text-xs text-gray-500 mb-1 text-center">Your Score</label>
                <input
                  type="number"
                  min="0"
                  max="7"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  value={score.winner}
                  onChange={(e) => setScore({ ...score, winner: e.target.value })}
                />
              </div>
              <span className="text-2xl text-gray-400 mt-5">-</span>
              <div>
                <label className="block text-xs text-gray-500 mb-1 text-center">Opponent Score</label>
                <input
                  type="number"
                  min="0"
                  max="7"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  value={score.loser}
                  onChange={(e) => setScore({ ...score, loser: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Submit Result
            </button>
            <button
              onClick={() => setView('challenges')}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Profile View
  const ProfileView = () => {
    const myMatches = matches.filter(
      m => m.winner.id === currentUser?.id || m.loser.id === currentUser?.id
    );

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {currentUser?.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{currentUser?.name}</h2>
              <p className="text-gray-600">Rank #{currentUser?.rank} â€¢ {currentUser?.gender === 'mens' ? 'Men\'s' : 'Women\'s'} Ladder</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Record</p>
              <p className="text-2xl font-bold text-gray-800">{currentUser?.wins}-{currentUser?.losses}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Win Rate</p>
              <p className="text-2xl font-bold text-gray-800">
                {currentUser && currentUser.wins + currentUser.losses > 0
                  ? Math.round((currentUser.wins / (currentUser.wins + currentUser.losses)) * 100)
                  : 0}%
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600"><strong>Email:</strong> {currentUser?.email}</p>
            <p className="text-sm text-gray-600"><strong>Phone:</strong> {currentUser?.phone}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Match History</h3>
          {myMatches.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No matches played yet</p>
          ) : (
            <div className="space-y-3">
              {myMatches.slice(-5).reverse().map((match) => {
                const won = match.winner.id === currentUser?.id;
                return (
                  <div key={match.id} className={`p-3 rounded-lg ${won ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className={`font-semibold ${won ? 'text-green-800' : 'text-red-800'}`}>
                          {won ? 'Won' : 'Lost'} vs {won ? match.loser.name : match.winner.name}
                        </p>
                        <p className="text-sm text-gray-600">Score: {match.score}</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(match.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Main App Layout
  if (!currentUser) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="text-green-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-800">Tennis Ladder</h1>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setView('ladder')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  view === 'ladder' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Users size={18} className="inline mr-1" />
                Ladder
              </button>
              
              <button
                onClick={() => setView('challenges')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  view === 'challenges' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <TrendingUp size={18} className="inline mr-1" />
                Challenges
              </button>
              
              <button
                onClick={() => setView('profile')}
                className={`px-3 py-2 rounded-lg font-medium transition-colors text-sm ${
                  view === 'profile' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={18} className="inline mr-1" />
                Profile
              </button>
              
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setView('login');
                }}
                className="px-3 py-2 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors text-sm"
              >
                <LogOut size={18} className="inline mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {view === 'ladder' && <LadderView />}
        {view === 'challenges' && <ChallengesView />}
        {view === 'profile' && <ProfileView />}
        {view === 'reportMatch' && <ReportMatchView />}
      </main>
    </div>
  );
}