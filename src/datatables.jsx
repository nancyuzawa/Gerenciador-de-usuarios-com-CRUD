import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import DataTabl from 'react-data-table-component'
 
DataTable.use(DT);

function Datatables() {
  const [count, setCount] = useState(0)

  return (
    <>
      <DataTable className="display">
      <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Cidade</th>
            </tr>
        </thead>
        <tbody>
            <tr><td>1</td><td>Maria Silva</td><td>28</td><td>São Paulo</td></tr>
            <tr><td>2</td><td>João Souza</td><td>35</td><td>Rio de Janeiro</td></tr>
            <tr><td>3</td><td>Ana Oliveira</td><td>24</td><td>Belo Horizonte</td></tr>
            <tr><td>4</td><td>Carlos Lima</td><td>40</td><td>Curitiba</td></tr>
            <tr><td>5</td><td>Fernanda Rocha</td><td>30</td><td>Salvador</td></tr>
            <tr><td>6</td><td>Lucas Almeida</td><td>27</td><td>Fortaleza</td></tr>
            <tr><td>7</td><td>Patrícia Mendes</td><td>33</td><td>Recife</td></tr>
            <tr><td>8</td><td>Rodrigo Ferreira</td><td>38</td><td>Porto Alegre</td></tr>
            <tr><td>9</td><td>Bruna Costa</td><td>29</td><td>Manaus</td></tr>
            <tr><td>10</td><td>Gustavo Martins</td><td>31</td><td>Brasília</td></tr>
            <tr><td>11</td><td>Juliana Lopes</td><td>26</td><td>Goiânia</td></tr>
            <tr><td>12</td><td>André Pereira</td><td>37</td><td>Belém</td></tr>
            <tr><td>13</td><td>Camila Duarte</td><td>25</td><td>Florianópolis</td></tr>
            <tr><td>14</td><td>Eduardo Barbosa</td><td>39</td><td>São Luís</td></tr>
            <tr><td>15</td><td>Rafaela Nunes</td><td>32</td><td>Maceió</td></tr>
            <tr><td>16</td><td>Fábio Teixeira</td><td>34</td><td>João Pessoa</td></tr>
            <tr><td>17</td><td>Vanessa Ribeiro</td><td>28</td><td>Teresina</td></tr>
            <tr><td>18</td><td>Thiago Fernandes</td><td>41</td><td>Natal</td></tr>
            <tr><td>19</td><td>Isabela Cardoso</td><td>29</td><td>Campo Grande</td></tr>
            <tr><td>20</td><td>Ricardo Borges</td><td>36</td><td>Cuiabá</td></tr>
            <tr><td>21</td><td>Helena Farias</td><td>27</td><td>Aracaju</td></tr>
            <tr><td>22</td><td>Marcos Vieira</td><td>42</td><td>Boa Vista</td></tr>
            <tr><td>23</td><td>Larissa Gomes</td><td>31</td><td>Palmas</td></tr>
            <tr><td>24</td><td>Felipe Moreira</td><td>30</td><td>Macapá</td></tr>
            <tr><td>25</td><td>Renata Santana</td><td>35</td><td>Rio Branco</td></tr>
            <tr><td>26</td><td>Gabriel Couto</td><td>33</td><td>Vitória</td></tr>
            <tr><td>27</td><td>Daniela Vasconcelos</td><td>26</td><td>Porto Velho</td></tr>
            <tr><td>28</td><td>Leandro Batista</td><td>40</td><td>Sorocaba</td></tr>
            <tr><td>29</td><td>Adriana Cavalcante</td><td>29</td><td>Caxias do Sul</td></tr>
            <tr><td>30</td><td>Henrique Moura</td><td>38</td><td>Uberlândia</td></tr>
            <tr><td>31</td><td>Amanda Pires</td><td>32</td><td>Niterói</td></tr>
            <tr><td>32</td><td>Sérgio Andrade</td><td>41</td><td>Campinas</td></tr>
            <tr><td>33</td><td>Débora Maciel</td><td>28</td><td>Londrina</td></tr>
            <tr><td>34</td><td>Otávio Rezende</td><td>37</td><td>Bauru</td></tr>
            <tr><td>35</td><td>Raquel Cunha</td><td>27</td><td>Blumenau</td></tr>
            <tr><td>36</td><td>Pedro Neves</td><td>39</td><td>Petrópolis</td></tr>
            <tr><td>37</td><td>Elaine Siqueira</td><td>34</td><td>Marília</td></tr>
            <tr><td>38</td><td>Vitor Camargo</td><td>30</td><td>Jundiaí</td></tr>
            <tr><td>39</td><td>Tatiane Bueno</td><td>31</td><td>Santos</td></tr>
            <tr><td>40</td><td>Jorge Lemos</td><td>42</td><td>Ribeirão Preto</td></tr>
            <tr><td>41</td><td>Monique Dantas</td><td>25</td><td>São José dos Campos</td></tr>
            <tr><td>42</td><td>César Paiva</td><td>33</td><td>Franca</td></tr>
            <tr><td>43</td><td>Beatriz Assis</td><td>29</td><td>Ponta Grossa</td></tr>
            <tr><td>44</td><td>Fernando Corrêa</td><td>38</td><td>Presidente Prudente</td></tr>
            <tr><td>45</td><td>Silvana Lopes</td><td>36</td><td>Maringá</td></tr>
            <tr><td>46</td><td>Alexandre Rios</td><td>41</td><td>Joinville</td></tr>
            <tr><td>47</td><td>Karen Barbosa</td><td>28</td><td>Passo Fundo</td></tr>
            <tr><td>48</td><td>Vinícius Mendes</td><td>30</td><td>Chapecó</td></tr>
            <tr><td>49</td><td>Elaine Souza</td><td>35</td><td>Itajaí</td></tr>
            <tr><td>50</td><td>Roberto Almeida</td><td>39</td><td>Criciúma</td></tr>
        </tbody>
      </DataTable>
    </>
  )
}

export default Datatables
