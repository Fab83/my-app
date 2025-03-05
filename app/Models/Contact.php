<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{

    protected $fillable = [
        'nom',
        'prenom',
        'statut',
        'adresse_proprietaire',
        'commune_proprietaire',
        'email',
        'telephone',
        'revenu_fiscal',
        'nombre_personnes',
        'locataire_loyer',
    ];
}
