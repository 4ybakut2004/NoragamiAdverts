class CreateAdverts < ActiveRecord::Migration
  def change
    create_table :adverts do |t|
      t.string :nickname
      t.string :avatar
      t.text :text
      t.string :title

      t.timestamps
    end
  end
end
