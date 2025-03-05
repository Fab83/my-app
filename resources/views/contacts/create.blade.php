<x-app-layout>
    <x-slot name="slot">
        <div class="flex justify-center mt-4">
            <h1>Créer contact</h1>

            <form action="{{ route('contacts.store') }}" method="POST">
                @csrf
                <div>
                    <label for="nom">Nom :</label>
                    <input class="w-full h-8 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" id="nom" name="nom" required>
                </div>
                <div>
                    <label for="prenom">Prénom :</label>
                    <input class="w-full h-8 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" id="prenom" name="prenom" required>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input class="w-full h-8 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="email" id="email" name="email" required>
                </div>
                <div>
                    <label for="phone">Téléphone:</label>
                    <input class="w-full h-8 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" id="phone" name="telephone" required>
                </div>
                <div>
                    <label for="adresse_proprietaire">Adresse prop :</label>
                    <input class="w-full h-8 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" type="text" id="adresse_proprietaire" name="adresse_proprietaire" required>
                </div>
                <div>
                    <label for="statut">Statut :</label>
                    <select class="w-full h-10 px-3 mb-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" id="statut" name="statut" required>
                        <option value="Propriétaire Occupant">Propriétaire Occupant</option>
                        <option value="Propriétaire Bailleur">Propriétaire Bailleur</option>
                        <option value="Locataire">Locataire</option>
                        <option value="Usufruitier">Usufruitier</option>
                        <option value="Nu-propriétaire">Nu-propriétaire</option>
                        <option value="SCI">SCI</option>
                    </select>
                </div>
                <button class="inline-flex items-center h-8 px-4 m-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800" type="submit">Créer Contact</button>
        </div>
        </form>

        </div>
    </x-slot>
</x-app-layout>


'commune_proprietaire',
'revenu_fiscal',
'nombre_personnes',
'locataire_loyer',