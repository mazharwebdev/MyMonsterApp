

User.destroy_all
Monster.destroy_all


admin = User.create!(username: 'admin', name: 'AdminName', email: 'admin@gmail.com', password: 'admin',admin: true)
ari = User.create!(username: 'ari', name: 'Ari', email: 'ari@gmail.com', password: 'password')
j = User.create!(username: 'j',name: 'J', email: 'jx@gmail.com', password: 'password')
bell = User.create!(username: 'bell', name: 'Bell', email: 'bell@ga.com', password: 'password')
dom = User.create!(username: 'dom', name: 'Dom', email: 'dom@ga.com', password: 'password')
ramsay = User.create!(username: 'ramsay',name: 'Ramsay', email: 'ramsay@ga.co', password: 'password')
drew = User.create!(username: 'drew', name: "Drew", email: 'drew@ga.co', password: 'password')

puts "#{User.count} Users Created!"


Monster.create!(user: ramsay, name: 'NMP Monster', description: "NPM Monster Description")
Monster.create!(user: ramsay, name: 'NMP Heroku Monster', description: "NPM Monster Description deployed
 to heroku")
Monster.create!(user: drew, name: 'Kotlin Monster', description: "NPM Monster Description")
Monster.create!(user: drew, name: 'Java Monster', description: "NPM Monster Description")

puts "#{Monster.count} Monsters Created!"