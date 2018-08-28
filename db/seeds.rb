

User.destroy_all
Monster.destroy_all


ari = User.create!(username: 'ari', email: 'ari@gmail.com', password: 'password')
j = User.create!(username: 'j', email: 'jx@gmail.com', password: 'password')
bell = User.create!(username: 'bell', email: 'bell@ga.com', password: 'password')
dom = User.create!(username: 'dom', email: 'dom@ga.com', password: 'password')
ramsay = User.create!(username: 'ramsay', email: 'ramsay@ga.co', password: 'password')
drew = User.create!(username: 'drew', email: 'drew@ga.co', password: 'password')

puts "#{User.count} Users Created!"


Monster.create!(user: ramsay, name: 'NMP Monster', description: "NPM Monster Description")
Monster.create!(user: ramsay, name: 'NMP Heroku Monster', description: "NPM Monster Description deployed
 to heroku")
Monster.create!(user: drew, name: 'Kotlin Monster', description: "NPM Monster Description")
Monster.create!(user: drew, name: 'Java Monster', description: "NPM Monster Description")

puts "#{Monster.count} Monsters Created!"