#include <iostream>
#include <string>
#include <iterator>
#include <vector>
#include <set>

using namespace std;

void split(vector<string> &tokens,const string& str, const string& delim)
{

    size_t prev = 0, pos = 0;
    do
    {
        pos = str.find(delim, prev);
        if (pos == string::npos) pos = str.length();
        string token = str.substr(prev, pos-prev);
        if (!token.empty()) tokens.push_back(token);
        prev = pos + delim.length();
    }
    while (pos < str.length() && prev < str.length());

}

int main(){
		
		string data;
		std::set<std::string> categories;
		vector<string> parts;
		string result;
		while(cin>>data){
		std::string delimiter = "\"";
		
		split(parts,data,delimiter);
		}
		for(int i = 0; i < parts.size(); i++){
			if(parts.at(i) == "genre"){
			//result += parts.at(i+2) + "\n";
			if(parts.at(i+2) != "notes")
			categories.insert(parts.at(i+2));
			//cout<<parts.at(i)<<"\n";
			}
		}
		categories.insert("null");
		
        result += "{\"categories\":[" ;
        // iterators (legacy)
        for( std::set<std::string>::iterator iter = categories.begin() ; iter != categories.end() ; ++iter ) 
        {
			result += "\"" +*iter+ "\"" + ",\n";
		}
		result += "]}";
		cout<<result;
		return 0;
	}
